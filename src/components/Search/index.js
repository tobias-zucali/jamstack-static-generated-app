import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate, Link } from 'gatsby'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

import Downshift from 'downshift'

import path from 'utils/path'


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
`
const ListItemLink = styled(Link)`
  background-color: ${({ isHighlighted }) => isHighlighted && '#eeeeee'};
  color: inherit;
  display: flex;
  margin: 0 -0.5rem;
  padding: 0.5rem;
  text-decoration: none;
`
const MatchEm = styled.em`
  background: yellow;
  font-style: inherit;
`

const RenderMatch = ({ pre, match, post }) => (
  <>
    {pre}
    <MatchEm>{match}</MatchEm>
    {post}
  </>
)
RenderMatch.propTypes = {
  pre: PropTypes.string,
  match: PropTypes.string,
  post: PropTypes.string,
}
const RenderMatchInAttribute = ({ name, match }) => (
  <>
    {name}
    {' '}
    (
    <RenderMatch {...match} />
    )
  </>
)
RenderMatchInAttribute.propTypes = {
  name: PropTypes.string,
  match: PropTypes.object.isRequired,
}
const getProductPath = (product) => path.join(
  '/category',
  product.category.slug,
  product.slug,
)
const navigateToProduct = (product) => navigate(getProductPath(product))

function Search() {
  const [isFocused, setIsFocused] = useState(false)
  const [items, setItems] = useState([])
  const inputValueRef = useRef('')
  const handleInputChange = debounce(async (newInputValue = '') => {
    inputValueRef.current = newInputValue
    const result = await fetch(
      `/.netlify/functions/search?q=${encodeURIComponent(newInputValue)}`
    )
    const newItems = await result.json()
    setItems(newItems.map(({ matches, product }) => ({
      node: matches.product
        ? (
          <RenderMatch {...matches.product} />
        ) : (
          <RenderMatchInAttribute
            name={product.name}
            match={matches.category || matches.manufacturer}
          />
        ),
      product,
    })))
  }, 500)

  return (
    <Downshift
      onChange={(selection) => navigateToProduct(selection.product)}
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
        // selectedItem,
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
                      {...getItemProps({
                        key: item.product.slug,
                        index,
                        item,
                      })}
                    >
                      <ListItemLink
                        isHighlighted={highlightedIndex === index}
                        to={getProductPath(item.product)}
                      >
                        {item.node}
                      </ListItemLink>
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
