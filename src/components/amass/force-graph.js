import { zoom } from "d3";
import { scaleOrdinal, schemeCategory10 } from "d3";
import { drag } from "d3";
import { zoomIdentity } from "d3";
import { pointer } from "d3";
import { select, forceSimulation, forceLink, forceManyBody } from "d3";
import { forceCollide, forceCenter } from "d3-force";
import React, { useEffect, useRef, useState } from "react";

import "./force-graph.scss";

const IPV46REGEX =
  /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/gm;
const NUMBER = /^[0-9]+$/gm;

const useResizeObserver = (ref) => {
  const [dimension, setDimension] = useState(null);
  useEffect(() => {
    const observerTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimension(entry.contentRect);
      });
    });
    resizeObserver.observe(observerTarget);
    return () => {
      resizeObserver.unobserve(observerTarget);
    };
  }, [ref]);
  return dimension;
};

const ForceGraph = ({ data, onNodeClick = () => {} }) => {
  const wrapperRef = useRef();
  const canvasRef = useRef();
  const dimension = useResizeObserver(wrapperRef);

  const [graph] = useState(data);

  useEffect(() => {
    if (!dimension) return;
    const { width, height } = dimension;

    const { graph: linkData, labels: nodeData } = graph;

    nodeData.forEach((node) => {
      node.id = node.node;
      node.num = 0;
    });

    linkData.forEach((link) => {
      link.source = link.src;
      link.target = link.dst;
      link.label = link.edgeTitle;

      nodeData[link.src].num++;
      nodeData[link.dst].num++;
    });

    const max = nodeData.length;
    const r = 4;

    const nodePercent = (d) => d.node / max;
    const nodeRadius = (d) => 1.5 * r + 3 * r * nodePercent(d);
    const nodeCollideRadius = (d) => nodeRadius(d) + 1;
    const nodeLinkDistance = (e) => {
      const n1 = nodeData[e.source.id];
      const n2 = nodeData[e.target.id];

      const avg = (nodePercent(n1) + nodePercent(n2)) / 2;

      return 60 * avg;
    };

    const nodeLinkStrength = (e) => {
      const n1 = nodeData[e.source.id];
      const n2 = nodeData[e.target.id];

      const avg = (nodePercent(n1) + nodePercent(n2)) / 2;

      return 1 - 1 * avg;
    };

    const nodeChargeStregth = (d) => {
      return -100 + -300 * nodePercent(d);
    };

    const dragstarted = (event) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = transform.invertX(event.subject.x);
      event.subject.fy = transform.invertY(event.subject.y);
    };
    const dragged = (event) => {
      event.subject.fx = transform.invertX(event.x);
      event.subject.fy = transform.invertY(event.y);
    };
    const dragended = (event) => {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    };

    const drawNode = (d) => {
      const size = nodeRadius(d);
      d.pointLabel = d.pointLabel.trim();
      // console.log(d);

      ctx.beginPath();
      ctx.fillStyle = color(d.pointColor);
      ctx.moveTo(d.x, d.y);
      ctx.arc(d.x, d.y, size, 0, 2 * Math.PI);
      ctx.strokeStyle = "#333333";
      ctx.stroke();
      ctx.fill();

      const isIP = IPV46REGEX.test(d.pointLabel);
      const isNumber = NUMBER.test(d.pointLabel);

      if (!isIP && !isNumber) {
        ctx.fillStyle = "#222222";
        ctx.textAlign = "center";
        ctx.fillText(`${d.pointLabel}`, d.x, d.y);
      }
    };

    const drawEdge = (e) => {
      const dx = e.target.x - e.source.x;
      const dy = e.target.y - e.source.y;

      ctx.beginPath();
      ctx.moveTo(e.source.x, e.source.y);
      ctx.lineTo(e.target.x, e.target.y);
      ctx.strokeStyle = "#aaa";
      ctx.stroke();

      const pad = 1 / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.translate(e.source.x + dx * pad, e.source.y + dy * pad);

      if (dx < 0) {
        ctx.rotate(Math.atan2(dy, dx) - Math.PI);
      } else {
        ctx.rotate(Math.atan2(dy, dx));
      }
      ctx.fillStyle = "#aaa";
      ctx.fillText(e.label, 0, 0);
      ctx.restore();
    };

    const update = () => {
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      linkData.forEach(drawEdge);
      nodeData.forEach(drawNode);

      if (closeNode) {
        closeNode.pointLabel = closeNode.pointLabel.trim();
        const isIP = IPV46REGEX.test(closeNode.pointLabel);
        const type = isIP ? `IP` : `Domain`;
        select("#graph-tooltip")
          .style("opacity", 0.8)
          .style("top", transform.applyY(closeNode.y) + 5 + "px")
          .style("left", transform.applyX(closeNode.x) + 5 + "px")
          .text(
            `${type}: ${closeNode.pointLabel}, Source: ${closeNode.source}`
          );
      } else {
        select("#graph-tooltip").style("opacity", 0);
      }

      ctx.restore();
    };

    let transform = zoomIdentity;

    const zoomed = (event) => {
      transform = event.transform;
      update();
    };

    const findNode = (x, y) => {
      const newx = transform.invertX(x);
      const newy = transform.invertY(y);
      return nodeData.find((node) => {
        const radius = nodeRadius(node);
        const dx = newx - node.x;
        const dy = newy - node.y;
        return dx * dx + dy * dy < radius * radius;
      });
    };

    const color = scaleOrdinal(schemeCategory10);

    // Canvas
    const canvas = select(canvasRef.current)
      .attr("width", width)
      .attr("height", height)
      .node();

    let closeNode;
    select(canvas).on("mousemove", (event) => {
      const p = pointer(event);

      closeNode = findNode(p[0], p[1]);
      update();
    });

    const ctx = canvas.getContext("2d");

    const simulation = forceSimulation()
      .nodes(nodeData)

      .force(
        "link",
        forceLink()
          .links(linkData)
          .distance(nodeLinkDistance)
          .strength(nodeLinkStrength)
          .id((d) => d.id)
      )
      .force(
        "charge",
        forceManyBody()
          .strength(nodeChargeStregth)
          .distanceMax(width * 2)
      )
      .force("collide", forceCollide().radius(nodeCollideRadius))
      .force("center", forceCenter(width / 2, height / 2))
      .on("tick", update);

    const dragsubject = (event) => {
      const node = findNode(event.x, event.y);

      node.x = transform.applyX(node.x);
      node.y = transform.applyY(node.y);

      return node;
    };

    const clicked = (event, d) => {
      if (event.defaultPrevented) return; // drag

      const p = pointer(event);

      const node = findNode(p[0], p[1]);

      if (!node) return;

      // TODO: Jump to subdomain detail
      onNodeClick(event, node);
    };

    select(canvas)
      .call(
        drag()
          .container(canvas)
          .subject(dragsubject)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .call(
        zoom()
          .scaleExtent([1 / 10, 8])
          .on("zoom", zoomed)
      );

    select(canvas).on("click", clicked);

    update();

    return () => {
      simulation.stop();
    };
  }, [graph, dimension]);

  return (
    <>
      <div className="graph-wrapper" ref={wrapperRef}>
        <canvas ref={canvasRef} className="mainCanvas" />
      </div>
      <div className="tooltip" id="graph-tooltip" />
    </>
  );
};

export default ForceGraph;
