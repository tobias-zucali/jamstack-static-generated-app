import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import Downshift from 'downshift'


const allItems = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
]

const Label = styled.label`
  color: #999999;
  display: block;
  font-size: 0.75em;
  margin-bottom: 0.25rem;
`

const Container = styled.div`
  max-width: 30em;
  margin: auto;
  position: relative;
  left: 0;
  right: 0;
  top: 20vh;
`

const Box = styled.div`
  border: solid #ddd 1px;
  border-radius: 0.5rem;
  box-shadow: ${({ isFocused }) => isFocused && '0 0 5px #dddddd'};
`

const Input = styled.input`
  border: none;
  background: transparent;
  font-size: 1.5rem;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  position: relative;
  &::before {
    background: #dddddd;
    content: "";
    height: 1px;
    left: 0.5rem;
    position: absolute;
    right: 0.5rem;
    top: 0;
  }
`
const ListItem = styled.li`
  background-color: ${({ isHighlighted }) => isHighlighted && '#eeeeee'};
  font-weight: ${({ isSelected }) => isSelected && 'bold'};
  padding: 0.5rem;
  margin: 0 -0.5rem;
`


function Search() {
  const [isFocused, setIsFocused] = useState(false)
  const [items, setItems] = useState([])
  const inputValueRef = useRef('')
  const handleInputChange = debounce((newInputValue) => {
    inputValueRef.current = newInputValue
    setItems(allItems.filter(
      (item) => !newInputValue || item.value.includes(newInputValue)
    ))
  }, 500)

  return (
    <Downshift
      onChange={(selection) => alert(`You selected ${selection.value}`)}
      itemToString={(item) => (item ? item.value : '')}
      style={{ color: 'green' }}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getRootProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => {
        if (inputValue !== inputValueRef.current) {
          handleInputChange(inputValue)
        }
        return (
          <Container
            isOpen={isOpen}
            {...getRootProps()}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <Label {...getLabelProps()}>
              The best offers
            </Label>

            <Box isFocused={isFocused}>
              <Input
                {...getInputProps()}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {isOpen && items.length > 0 && (
                <List {...getMenuProps()}>
                  {items.map((item, index) => (
                    <ListItem
                      isSelected={selectedItem === item}
                      isHighlighted={highlightedIndex === index}
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                      })}
                    >
                      {item.value}
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Container>
        )
      }}
    </Downshift>
  )
}

export default Search
