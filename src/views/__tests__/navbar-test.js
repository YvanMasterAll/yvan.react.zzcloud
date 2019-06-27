import React from 'react'
import {shallow} from 'enzyme'

jest.unmock('../navbar')
import {Navbar} from '../navbar'

describe('Navbar', () => {

    let wrapper

    it('wraps content in a div with .navbar class', () => {
        wrapper = shallow(<Navbar />)
        expect(wrapper.find('.navbar').length).toEqual(1)
    })

    describe('links', () => {

        let Links

        beforeEach(() => {
            wrapper = shallow(<Navbar />)
            Links = wrapper.find('Link')
        })

        it('renders a link to home', () => {
            const link = Links.first()
            expect(link).toBeDefined()
            expect(link.childAt(0).text()).toBe('Home')
            expect(link.props().to).toBe('/home')
        })
        it('renders an about link', () => {
            const link = wrapper.findWhere(n => n.props().to == '/about')
            expect(link).toBeDefined()
            expect(link.childAt(0).text()).toBe('About')
        })
    })

    describe('with a currentUser', () => {
        
        let currentUser

        describe('that is not logged in', () => {
            beforeEach(() => {
                currentUser = {loggedIn: false}
                wrapper = shallow(
                    <Navbar currentUser={currentUser} />
                )
            })

            it('shows a link a login', () => {
                const link = wrapper.find({to: '/login'})
                expect(link.length).toEqual(1)
                expect(link.childAt(0).text()).toBe('Login')
            })
        })
        describe('that is logged in', () => {
            beforeEach(() => {
                currentUser = {loggedIn: true}
                wrapper = shallow(
                    <Navbar currentUser={currentUser} />
                )
            })

            it('shows a link to logout', () => {
                const link = wrapper.findWhere(n => n.props().to == '/logout')
                expect(link.length).toEqual(1)
                expect(link.childAt(0).text()).toBe('Logout')
            })
        })
    })
})