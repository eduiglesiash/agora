import './BooksInput.css';

export default function Input(params) {
  const { id,
    classes,
    value,
    name,
    type,
    layer,
    placeholder,
    helpText,
    onChange,
    error,
    required } = params

    const classnames = `Books__input ${classes || ''} ${error !== undefined && error !== '' ? 'Books__input--error' : ''}`;
  return (
    <div className='Books__input-container'>
      <span className={error !== undefined && error !== '' ? 'Books__input-layer Books__input-layer--error' : 'Books__input-layer'}>{layer}</span>
      <input
        id={id}
        className={classnames}
        defaultValue={value}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
      {helpText && (
        <p className='Books__input-help'>{helpText}</p>
      )}
      {error !== undefined && error !== '' && (
        <span className='Books__input-error'>{error}</span>
      )}
    </div>
  )
}
