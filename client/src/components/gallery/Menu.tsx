import React from 'react';
import {
  Button, Container, Dropdown, FormLabel, Nav, Navbar, Stack,
} from 'react-bootstrap';
import {
  ArrowDown, ArrowUp, BoxArrowRight, CloudFill,
} from 'react-bootstrap-icons';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setShowDeleteModal, setShowUploadModal } from '../../features/componentsVisibility';
import { setSelected, setSortBy, setSortReverse } from '../../features/images';
import Token from '../../utils/token.util';
import SelectImageUtil from '../../utils/selectImage.util';
import './Menu.scss';

function Menu() {
  const display = useSelector((state: RootState) => state.componentsVisibility.showMenu);
  const reverse = useSelector((state: RootState) => state.images.sortReverse);
  const sortBy = useSelector((state: RootState) => state.images.sortBy);
  const images = useSelector((state: any) => state.images.list);
  const selectedImages = useSelector((state: RootState) => state.images.selected);

  const btnClass = `d-${selectedImages.length > 0 ? 'flex' : 'none'}`;

  const displayClassName = display ? 'block' : 'none';

  const dispatch = useDispatch();

  const logOut = (): void => {
    Token.remove();
    window.location.href = '/login';
  };

  const selectAllImages = (): void => {
    const newSelectedArray = SelectImageUtil.selectAll(images, selectedImages);
    dispatch(setSelected(newSelectedArray));
  };

  return (
    <header className={`sticky-top d-${displayClassName}`}>
      <Navbar data-testid="menu" bg="dark" variant="dark" expand={selectedImages.length > 0 ? 'xl' : 'lg'}>
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
                <Button variant="light" className="nav-button shadow-none nw" onClick={logOut}>
                  Logout
                  <BoxArrowRight id="logout-icon" />
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-2">
                <Stack direction="horizontal" id="sort-by-menu" className="text-light">
                  <FormLabel className="ml-2 mb-0 sort-label nw">Sort by:</FormLabel>
                  <Dropdown className="dropdown-select">
                    <DropdownToggle className="w-auto d-inline-block nav-select shadow-none">
                      {sortBy}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={async (): Promise<void> => { dispatch(setSortBy('Date')); }}>Date</DropdownItem>
                      <DropdownItem onClick={async (): Promise<void> => { dispatch(setSortBy('Name')); }}>Name</DropdownItem>
                      <DropdownItem onClick={async (): Promise<void> => { dispatch(setSortBy('Size')); }}>Size</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button className="nav-arrow shadow-none" onClick={() => dispatch(setSortReverse(!reverse))}>
                    {' '}
                    {reverse ? <ArrowDown /> : <ArrowUp />}
                  </Button>
                </Stack>
              </Nav.Item>
              <Nav.Item className="mx-2">
                <Button variant="light" onClick={() => dispatch(setShowUploadModal(true))} className="nav-button shadow-none nw">Upload new image</Button>
              </Nav.Item>

              <Nav.Item className={`mx-2 ${btnClass}`}>
                <Button variant="danger" className="nav-button shadow-none nw" aria-label="Delete selected" onClick={() => dispatch(setShowDeleteModal(true))}>Delete</Button>
              </Nav.Item>

              <Nav.Item className={`mx-2 ${btnClass}`}>
                <Button variant="light" className="nav-button shadow-none nw" onClick={selectAllImages}>Select all</Button>
              </Nav.Item>

              <Nav.Item className={`mx-2 ${btnClass}`}>
                <Button variant="light" className="nav-button shadow-none nw" onClick={() => dispatch(setSelected([]))}>Cancel selection</Button>
              </Nav.Item>

              <Nav.Item className={`mx-2 text-light d-flex justify-content-center align-items-center nw ${btnClass}`}>
                <span>
                  Selected
                  {' '}
                  {selectedImages.length}
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

export default Menu;
