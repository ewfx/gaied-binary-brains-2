import React, { useState } from 'react';

const styles = `
  .data-display-container {
    display: flex;
    height: 500px;
    border: 1px solid #ccc;
    font-family: sans-serif;
  }

  .left-pane {
    width: 300px;
    border-right: 1px solid #eee;
    padding: 15px;
    overflow-y: auto;
    background-color: #f9f9f9;
  }

  .left-pane h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
  }

  .left-pane ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .left-pane ul li {
    margin-bottom: 5px;
  }

  .left-pane ul li button {
    width: 100%;
    text-align: left;
    padding: 8px 10px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    color: #555;
  }

  .left-pane ul li button:hover {
    background-color: #eee;
  }

  .left-pane ul li button.selected {
    font-weight: bold;
    color: #007bff;
    background-color: #e9ecef;
  }

  .left-pane ul ul {
    margin-left: 15px;
  }

  .right-pane {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #fff;
  }

  .right-pane h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
  }

  .right-pane p {
    margin-bottom: 10px;
    color: #666;
  }

  .right-pane pre {
    background-color: #f4f4f4;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 12px;
    color: #333;
  }
`;


function DataDisplay(transformedData) {
  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [details, setDetails] = useState(null);

  const requestTypes = Object.keys(transformedData);

  const handleRequestTypeClick = (requestType) => {
    setSelectedRequestType(requestType);
    setSelectedName(null);
    setDetails(null);
  };

  const handleNameClick = (name) => {
    setSelectedName(name);
    const selectedRequestTypeData = transformedData[selectedRequestType];
    const selectedItem = selectedRequestTypeData.find(item => item.name === name);
    if (selectedItem) {
      setDetails(selectedItem.details);
    } else {
      setDetails(null);
    }
  };

  return (
    <div className="data-display-container">
      <style>{styles}</style>
      {/* Left Pane (Request Types & Names) */}
      <div className="left-pane">
        <h3>Request Types</h3>
        <ul>
          {requestTypes.map((requestType) => (
            <li key={requestType}>
              <button
                onClick={() => handleRequestTypeClick(requestType)}
                className={selectedRequestType === requestType ? 'selected' : ''}
              >
                {requestType}
              </button>
              {selectedRequestType === requestType && transformedData[requestType] && (
                <ul style={{ marginLeft: '15px' }}>
                  {transformedData[requestType].map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNameClick(item.name)}
                        className={selectedName === item.name ? 'selected' : ''}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Pane (Details) */}
      <div className="right-pane">
        <h3>Details</h3>
        {selectedName && <p>Selected Name: <strong>{selectedName}</strong></p>}
        {details ? (
          <pre>{JSON.stringify(details, null, 2)}</pre>
        ) : (
          selectedRequestType ? (
            <p>Select a name from the left to see details.</p>
          ) : (
            <p>Select a Request Type from the left.</p>
          )
        )}
      </div>
    </div>
  );
}

export default DataDisplay;