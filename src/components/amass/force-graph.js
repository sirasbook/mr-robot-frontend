import { zoom } from "d3";
import { scaleOrdinal, schemeCategory10 } from "d3";
import { drag } from "d3";
import { select, forceSimulation, forceLink, forceManyBody } from "d3";
import { forceCollide } from "d3-force";
import { forceCenter } from "d3-force";
import React, { useEffect, useRef, useState } from "react";

import "./force-graph.scss";

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

const ForceGraph = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimension = useResizeObserver(wrapperRef);

  const [graph, setGraph] = useState(data);

  useEffect(() => {
    if (!dimension) return;
    const { width, height } = dimension;

    const svg = select(svgRef.current).call(
      zoom().on("zoom", (event) => {
        svg.attr("transform", event.transform);
      })
    );

    const { graph: linkData, labels: nodeData } = graph;
    console.log(linkData, nodeData);

    nodeData.forEach((node) => {
      node.id = node.node;
      node.num = 0;
    });

    linkData.forEach((link) => {
      link.source = link.src;
      link.target = link.dst;

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

    const tooltip = select("#graph-tooltip");

    const dragstarted = (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    };

    const dragended = (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    const color = scaleOrdinal(schemeCategory10);
    const simulation = forceSimulation()
      .force(
        "link",
        forceLink()
          .id((d) => d.id)
          .distance(nodeLinkDistance)
          .strength(nodeLinkStrength)
      )
      .force(
        "charge",
        forceManyBody()
          .strength(nodeChargeStregth)
          .distanceMax(width * 2)
      )
      .force("collide", forceCollide().radius(nodeCollideRadius))
      .force("center", forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(linkData)
      .enter()
      .append("line")
      .attr("stroke-width", (d) => 2);

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodeData)
      .enter()
      .append("circle")
      .attr("r", nodeRadius)
      .attr("fill", (d) => color(d.pointColor))
      .call(
        drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
      );

    node.on("mousemove", (_, d) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip.html("test").style("left", `${d.x}px`).style("top", `${d.y}px`);
    });
    node.on("mouseout", () => {
      tooltip.transition().duration(200).style("opacity", 0);
    });

    const ticked = () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    };

    simulation
      .nodes(nodeData)

      .on("tick", ticked);
    simulation.force("link").links(linkData);

    return () => simulation.stop();
  }, [graph, dimension]);

  return (
    <>
      <div className="container" ref={wrapperRef}>
        <svg ref={svgRef} />
      </div>
      <div className="tooltip" id="graph-tooltip" />
    </>
  );
};

export default ForceGraph;
