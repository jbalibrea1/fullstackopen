const Filter = ({ value, onChange }) => (
  <div>
    Filter countries:
    <input value={value} onChange={onChange} />
  </div>
)

export default Filter
