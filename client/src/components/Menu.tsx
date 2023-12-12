import React from 'react';
import {
  Navbar, Container, Nav, Stack, FormLabel, Button, Dropdown,
} from 'react-bootstrap';
import {
  ArrowUp, CloudFill, ArrowDown, BoxArrowRight,
} from 'react-bootstrap-icons';
import '../scss/App.scss';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import { MenuProps, MenuState } from '../types/menu';

class Menu extends React.Component<MenuProps, MenuState> {
  render() {
    const btnClass = `d-${this.props.selectionCount > 0 ? 'flex' : 'none'}`;

    return (
      <header className={`sticky-top d-${this.props.navbarDisplay}`}>
        <Navbar data-testid="menu" bg="dark" variant="dark" expand={this.props.selectionCount > 0 ? 'xl' : 'lg'}>
          <Container fluid>
            <Navbar.Brand className="my-1 mx-3" href="#">
              <CloudFill />
              {' '}
              images-cloud
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <Nav.Item className="text-white mx-2">
                  <Button variant="light" className="nav-button shadow-none nw" onClick={this.props.logOut}>
                    Logout
                    <BoxArrowRight id="logout-icon" />
                  </Button>
                </Nav.Item>
                <Nav.Item className="mx-2">
                  <Stack direction="horizontal" id="sort-by-menu" className="text-light">
                    <FormLabel className="ml-2 mb-0 sort-label nw">Sort by:</FormLabel>
                    <Dropdown className="dropdown-select">
                      <DropdownToggle className="w-auto d-inline-block nav-select shadow-none">
                        {this.props.sortBy}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={async (): Promise<void> => { this.props.sortEvent('Date'); }}>Date</DropdownItem>
                        <DropdownItem onClick={async (): Promise<void> => { this.props.sortEvent('Name'); }}>Name</DropdownItem>
                        <DropdownItem onClick={async (): Promise<void> => { this.props.sortEvent('Size'); }}>Size</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Button className="nav-arrow shadow-none" onClick={this.props.reverseEvent}>
                      {' '}
                      {this.props.reverse ? <ArrowDown /> : <ArrowUp />}
                    </Button>
                  </Stack>
                </Nav.Item>
                <Nav.Item className="mx-2">
                  <Button variant="light" onClick={this.props.uploadModal} className="nav-button shadow-none nw">Upload new image</Button>
                </Nav.Item>

                <Nav.Item className={`mx-2 ${btnClass}`}>
                  <Button variant="danger" className="nav-button shadow-none nw" aria-label="Delete selected" onClick={this.props.deleteModal}>Delete</Button>
                </Nav.Item>

                <Nav.Item className={`mx-2 ${btnClass}`}>
                  <Button variant="light" className="nav-button shadow-none nw" onClick={this.props.selectAllPhotos}>Select all</Button>
                </Nav.Item>

                <Nav.Item className={`mx-2 ${btnClass}`}>
                  <Button variant="light" className="nav-button shadow-none nw" onClick={this.props.deselectPhotos}>Cancel selection</Button>
                </Nav.Item>

                <Nav.Item className={`mx-2 text-light d-flex justify-content-center align-items-center nw ${btnClass}`}>
                  <span>
                    Selected
                    {this.props.selectionCount}
                    {' '}
                    items
                  </span>
                </Nav.Item>

              </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </header>
    );
  }
}

export default Menu;
