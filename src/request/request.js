import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./request.scss";
import * as Bootstrap from "bootstrap";
import Header from "../components/header";

const Request = () => {
  const history = useHistory();
  const [url, setUrl] = useState(null);
  const [opt, setOpt] = useState(null);

  useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Bootstrap.Tooltip(tooltipTriggerEl);
    });
  };

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
    sessionStorage.setItem("url", e.target.value);
  };

  const handleClickNormal = (e) => {
    setOpt(e.target.value);
    sessionStorage.setItem("zap-option", "base");
  };

  const handleClickFull = (e) => {
    setOpt(e.target.value);
    sessionStorage.setItem("zap-option", "full");
  };

  const handleSubmit = (e) => {
    history.push("/report");
    e.preventDefault();
  };

  return (
    <div>
      <Header />
      <div className="request-container">
        <form className="was-validate" id="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="url"
              className="form-control url-input"
              id="inputUrl"
              placeholder="Enter your URL"
              onChange={handleChangeUrl}
              required
            />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input radio"
                type="radio"
                name="inlineRadioOptions"
                id="normal"
                value="normal"
                onClick={handleClickNormal}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Normal Scan
              </label>
              <i
                className="bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="It runs the ZAP spider against the specified target for (by default) 1 minute and then waits for the passive scanning to complete before reporting the results. This means that the script doesn’t perform any actual ‘attacks’ and will run for a relatively short period of time (a few minutes at most)."
              ></i>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input radio"
                type="radio"
                name="inlineRadioOptions"
                id="full"
                value="full"
                onClick={handleClickFull}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Full Scan
              </label>
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="It runs the ZAP spider against the specified target (by default with no time limit) followed by an optional ajax spider scan and then a full active scan before reporting the results. This means that the script does perform actual ‘attacks’ and can potentially run for a long period of time."
              >
                <i className="bi bi-question-circle"></i>
              </span>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              START PENETRATING
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Request;
