const PersonForm = ({
  onSubmit,
  valueName,
  valueNumber,
  onChangeName,
  onChangeNumber,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={valueName} onChange={onChangeName} />
    </div>
    <div>
      number: <input value={valueNumber} onChange={onChangeNumber} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

export default PersonForm
