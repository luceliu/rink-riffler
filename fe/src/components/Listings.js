import styled from 'styled-components'
import LocationDropdown from './LocationDropdown'

const Container = styled.div`
    width: 40%;
    height: 100vh;
    background-color: #E7E7E7;
    text-align: left;
`

const LocationText = styled.h2`
    display: inline-block;
    position: relative;
    left: 20px;
`

const Listings = () => {
    return (
    <Container>
        <LocationText>Location</LocationText>
        <LocationDropdown/>
    </Container>
    );
}

export default Listings;