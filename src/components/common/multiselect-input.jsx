import React from 'react'
import {FormGroup, MenuItem, Intent} from '@blueprintjs/core'
import {MultiSelect} from '@blueprintjs/select'

const MultiselectInput = ({input, placeholder, label, items, selectedItems, onSelect, onDeselect}) => {

  const isSel = item => selectedItems.indexOf(item) > -1
  const tagRenderer = item => item

  const itemRenderer = (item, {handleClick}) => {
    return <MenuItem
        key={item}
        onClick={handleClick}
        intent={isSel(item) ? Intent.PRIMARY : Intent.NONE}
        icon={isSel(item) ? "tick" : "blank"}
        text={item}
      />
  }

  return (
    <FormGroup
      className="input-label"
      label={label}
      labelFor={`id-${input.name}`}>
      <MultiSelect
        {...input}
        placeholder={placeholder}
        items={items}
        itemRenderer={itemRenderer}
        onItemSelect={item => {
          isSel(item) ? onDeselect(item) : onSelect(item)
        }}
        popoverProps={{minimal: true}}
        noResults={<MenuItem disabled={true} text="No results." />}
        tagRenderer={tagRenderer}
        tagInputProps={{onRemove: onDeselect}}
        selectedItems={selectedItems}
      />
    </FormGroup>
  )
}

export default MultiselectInput
