import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import log from 'utils/log'


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

export default function prepareSearchResult({ error, data }) {
  if (error) {
    log.warn('loading search result failed', error)
  }
  if (!data) {
    return []
  }

  return data.searchProducts.nodes.map(({ matches, node }) => ({
    display: matches.product ? (
      <RenderMatch {...matches.product} />
    ) : (
      <RenderMatchInAttribute
        name={node.name}
        match={matches.category || matches.manufacturer}
      />
    ),
    node,
  }))
}
