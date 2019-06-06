import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import memoize from 'lodash/memoize'
import useFetch from 'hooks/useFetch'


const MatchEm = styled.em`
  background: yellow;
  font-style: inherit;
`

const RenderMatch = ({ pre, match, post }) => (
  <>
    {pre}<MatchEm>{match}</MatchEm>{post}
  </>
)
RenderMatch.propTypes = {
  pre: PropTypes.string,
  match: PropTypes.string,
  post: PropTypes.string,
}
const RenderMatchInAttribute = ({ name, match }) => (
  <>
    {name} (<RenderMatch {...match} />)
  </>
)
RenderMatchInAttribute.propTypes = {
  name: PropTypes.string,
  match: PropTypes.object.isRequired,
}

export default function useFetchItems() {
  const { abortAndFetch, resolveAbortionErrors } = useFetch()
  return {
    fetchItems: useMemo(() => memoize(async (newInputValue = '') => {
      const result = await abortAndFetch(
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
    }), []), // eslint-disable-line react-hooks/exhaustive-deps
    resolveAbortionErrors,
  }
}
