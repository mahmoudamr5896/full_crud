import React, { useState } from 'react';

const FilterComponent = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    const filtered = data.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <input
        type="text"
        value={filterValue}
        onChange={handleFilterChange}
        placeholder="Filter data..."
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterComponent;