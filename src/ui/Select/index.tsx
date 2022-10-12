import React from 'react';

export type SelectOption = {
  value: string,
  label: string,
  disabled?: boolean
}

type Props = {
  options: SelectOption[],
  selectedValue?: string,
  onSelect: (value: string) => void
};

export const Select = ({
  options, 
  selectedValue = undefined, 
  onSelect: handleSelect
}: Props) => {
  return (
    <select
      className='form-select form-select-sm'
      value={selectedValue} 
      onChange={(e) => handleSelect(e.target.value)}
    >
      {options.map(o => 
        <option 
          key={o.value} 
          value={o.value} 
          disabled={o.disabled}
        >{o.label}</option>)}
    </select>
  )
}