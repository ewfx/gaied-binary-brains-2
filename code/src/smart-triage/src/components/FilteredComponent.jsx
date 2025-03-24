import React from 'react';
import styled from 'styled-components';

const DataCard = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
`;

const KeyLabel = styled.strong`
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
`;

const ValueDisplay = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 10px;
  word-break: break-word;
`;

const ObjectDisplay = styled.div`
  margin-left: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 10px;
`;

const ArrayDisplay = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ArrayItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fff;
`;

const ConfidenceScore = styled.span`
  color: ${({ score }) => (score > 0.9 ? 'green' : score > 0.7 ? 'orange' : 'red')};
  font-weight: bold;
  margin-left: 5px;
`;

const DuplicateStatus = styled.span`
  color: ${({ isDuplicate }) => (isDuplicate === 'Yes' ? 'red' : 'green')};
  font-weight: bold;
`;

const renderValue = (value, level = 0) => {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return (
        <ArrayDisplay>
          {value.map((item, index) => (
            <ArrayItem key={index}>{renderObject(item, level + 1)}</ArrayItem>
          ))}
        </ArrayDisplay>
      );
    } else {
      return <ObjectDisplay>{renderObject(value, level + 1)}</ObjectDisplay>;
    }
  } else if (typeof value === 'boolean') {
    return value ? <ValueDisplay><BooleanTrue>True</BooleanTrue></ValueDisplay> : <ValueDisplay><BooleanFalse>False</BooleanFalse></ValueDisplay>;
  } else if (typeof value === 'number') {
    return <ValueDisplay>{value.toLocaleString()}</ValueDisplay>;
  } else {
    return <ValueDisplay>{String(value)}</ValueDisplay>;
  }
};

const renderObject = (obj, level = 0) => {
  return Object.entries(obj).map(([key, value]) => (
    <div key={key}>
      <KeyLabel>{key.replace(/([A-Z])/g, ' $1').trim()}:</KeyLabel>
      {key === 'confidenceScore' ? (
        <ValueDisplay>
          {renderValue(value)} <ConfidenceScore score={value}>{`(${value * 100}%)`}</ConfidenceScore>
        </ValueDisplay>
      ) : key === 'isDuplicate' ? (
        <ValueDisplay>
          <DuplicateStatus isDuplicate={value}>{value}</DuplicateStatus>
        </ValueDisplay>
      ) : (
        renderValue(value, level)
      )}
    </div>
  ));
};

const BooleanTrue = styled.span`
  color: green;
  font-weight: bold;
`;

const BooleanFalse = styled.span`
  color: red;
  font-weight: bold;
`;

const FilteredComponent = ({ data }) => {
  return (
    <DataCard>
      {Object.keys(data).map((key) => (
        <div key={key}>
          <SectionTitle>{key.replace(/([A-Z])/g, ' $1').trim()}</SectionTitle>
          {Array.isArray(data[key]) ? (
            <ArrayDisplay>
              {data[key].map((item, index) => (
                <ArrayItem key={index}>
                  {renderObject(item)}
                </ArrayItem>
              ))}
            </ArrayDisplay>
          ) : typeof data[key] === 'object' && data[key] !== null ? (
            renderObject(data[key])
          ) : (
            <>
              <KeyLabel>{key.replace(/([A-Z])/g, ' $1').trim()}:</KeyLabel>
              {renderValue(data[key])}
            </>
          )}
        </div>
      ))}
    </DataCard>
  );
};

export default FilteredComponent;