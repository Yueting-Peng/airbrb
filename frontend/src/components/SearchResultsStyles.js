import styled from 'styled-components'

export const SearchedResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 5px;
  }
`
export const StyledSearchTitle = styled.h4`
  color: #574141;
  text-align: center;
`
