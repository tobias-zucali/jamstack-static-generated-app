import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'

import path from 'utils/path'

import Downshift from 'downshift'

import usePreparedSearchProducts from './usePreparedSearchProducts'


const Label = styled.label`
  color: #757575;
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

const Box = styled(({ isFocused, ...otherProps }) => <div {...otherProps} />)`
  border: solid #ddd 1px;
  box-shadow: ${({ isFocused }) => isFocused && '0 0 5px #dddddd;'};
  border-radius: 0.5rem;
`

const Input = styled.input`
  border: none;
  background: transparent;
  font-size: 1.5rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  max-height: 55vh;
  overflow: auto;
  padding: 0.5rem 1rem;
  position: relative;
  &::before {
    background: #dddddd;
    content: "";
    height: 1px;
    left: 1rem;
    position: absolute;
    right: 1rem;
    top: 0;
  }
`
const ListItem = styled.li`
`
const ListItemLink = styled(Link)`
  color: inherit;
  display: block;
  margin: 0 -1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
`
const ListItemLinkHighlighted = styled(ListItemLink)`
  background-color: #eeeeee;
`
const getProductPath = (product) => path.join(
  '/category',
  product.category.slug,
  product.slug,
)
const navigateToProduct = (product) => navigate(getProductPath(product))

function Search() {
  const [isFocused, setIsFocused] = useState(false)
  const [storedInputValue, setStoredInputValue] = useState('')

  const items = usePreparedSearchProducts(storedInputValue)

  return (
    <Downshift
      onChange={(selection) => navigateToProduct(selection.node)}
      itemToString={(item) => (item ? item.node.name : '')}
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
        // selectedItem,
      }) => {
        if (inputValue !== storedInputValue) {
          setStoredInputValue(inputValue)
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
              {(isOpen || isFocused) && items.length > 0 && (
                <List {...getMenuProps()}>
                  {items.map((item, index) => {
                    const ListItemLinkComponent = (highlightedIndex === index) ? ListItemLinkHighlighted : ListItemLink
                    return (
                      <ListItem
                        {...getItemProps({
                          key: item.node.slug,
                          index,
                          item,
                        })}
                      >
                        <ListItemLinkComponent to={getProductPath(item.node)}>
                          {item.display}
                        </ListItemLinkComponent>
                      </ListItem>
                    )
                  }
                  )}
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
