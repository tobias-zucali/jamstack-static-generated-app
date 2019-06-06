import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate, Link } from 'gatsby'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import memoize from 'lodash/memoize'

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
`
const BoxFocused = styled(Box)`
  box-shadow: 0 0 5px #dddddd;
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
  max-height: 55vh;
  overflow: auto;
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
  color: inherit;
  display: flex;
  margin: 0 -0.5rem;
  padding: 0.5rem;
  text-decoration: none;
`
const ListItemLinkHighlighted = styled(ListItemLink)`
  background-color: #eeeeee;
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

const fetchItems = memoize(async (newInputValue = '') => {
  // TODO cache results and persist for improved performance and offline use
  const result = await fetch(
    `/.netlify/functions/search?q=${encodeURIComponent(newInputValue)}`
  )
  const newItems = await result.json()

  return newItems.map(({ matches, product }) => ({
    node: matches.product ? (
      <RenderMatch {...matches.product} />
    ) : (
      <RenderMatchInAttribute
        name={product.name}
        match={matches.category || matches.manufacturer}
      />
    ),
    product,
  }))
})

function Search() {
  const [isFocused, setIsFocused] = useState(false)
  const [items, setItems] = useState([])
  const inputValueRef = useRef('')
  const handleInputChange = debounce((newInputValue) => {
    inputValueRef.current = newInputValue
    fetchItems(newInputValue).then(setItems)
  }, 300)

  useEffect(() => {
    fetchItems().then(setItems)
  }, [])

  const BoxComponent = isFocused ? BoxFocused : Box

  return (
    <Downshift
      onChange={(selection) => navigateToProduct(selection.product)}
      itemToString={(item) => (item ? item.product.name : '')}
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

            <BoxComponent>
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
                          key: item.product.slug,
                          index,
                          item,
                        })}
                      >
                        <ListItemLinkComponent to={getProductPath(item.product)}>
                          {item.node}
                        </ListItemLinkComponent>
                      </ListItem>
                    )
                  }
                  )}
                </List>
              )}
            </BoxComponent>
          </Container>
        )
      }}
    </Downshift>
  )
}

export default Search
