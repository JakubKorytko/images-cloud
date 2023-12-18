import React from 'react';
import {
  Button, Container, Dropdown, FormLabel, Nav, Navbar, Stack,
} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import {
  ArrowDown, ArrowUp, BoxArrowRight, CloudFill,
} from 'react-bootstrap-icons';

import SelectImageUtil from 'utils/selectImage.util';
import Token from 'utils/token.util';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { setShowDeleteModal, setShowUploadModal } from 'features/componentsVisibility';
import { setSelected, setSortBy, setSortReverse } from 'features/images';

import styles from 'components/gallery/Menu.module.scss';

function Menu() {
  const display = useAppSelector((state) => state.componentsVisibility.showMenu);
  const reverse = useAppSelector((state) => state.images.sortReverse);
  const sortBy = useAppSelector((state) => state.images.sortBy);
  const images = useAppSelector((state) => state.images.list);
  const selectedImages = useAppSelector((state) => state.images.selected);

  const btnClass = `d-${selectedImages.length > 0 ? 'flex' : 'none'}`;

  const dispatch = useAppDispatch();

  const logOut = (): void => {
    Token.remove();
    window.location.href = '/login';
  };

  const selectAllImages = (): void => {
    const newSelectedArray = SelectImageUtil.selectAll(images, selectedImages);
    dispatch(setSelected(newSelectedArray));
  };

  const s = selectedImages.length === 1 ? '' : 's';

  return (
    display ? (
      <header className="sticky-top">
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
                  <Button variant="light" className={`${styles['nav-button']} shadow-none ${styles.nw}`} onClick={logOut}>
                    Logout
                    <BoxArrowRight className={styles['logout-icon']} />
                  </Button>
                </Nav.Item>
                <Nav.Item className="mx-2">
                  <Stack direction="horizontal" className={`${styles['sort-by-menu']} text-light`}>
                    <FormLabel className={`ml-2 mb-0 ${styles['sort-label']} ${styles.nw}`}>Sort by:</FormLabel>
                    <Dropdown className={styles['dropdown-select']}>
                      <DropdownToggle className={`w-auto d-inline-block ${styles['nav-select']} shadow-none`}>
                        {sortBy}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={async (): Promise<void> => { dispatch(setSortBy('Date')); }}>Date</DropdownItem>
                        <DropdownItem onClick={async (): Promise<void> => { dispatch(setSortBy('Name')); }}>Name</DropdownItem>
                        <DropdownItem onClick={async (): Promise<void> => { dispatch(setSortBy('Size')); }}>Size</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Button className={`${styles['nav-arrow']} shadow-none`} onClick={() => dispatch(setSortReverse(!reverse))}>
                      {' '}
                      {reverse ? <ArrowDown /> : <ArrowUp />}
                    </Button>
                  </Stack>
                </Nav.Item>
                <Nav.Item className="mx-2">
                  <Button variant="light" onClick={() => dispatch(setShowUploadModal(true))} className={`${styles['nav-button']} shadow-none ${styles.nw}`}>
                    Upload new image
                  </Button>
                </Nav.Item>

                <Nav.Item className={`mx-2 ${btnClass}`}>
                  <Button variant="light" className={`${styles['nav-button']} shadow-none ${styles.nw}`} onClick={() => dispatch(setSelected([]))}>
                    Cancel selection
                  </Button>
                </Nav.Item>

                <Nav.Item className="mx-2">
                  <Button variant="light" className={`${styles['nav-button']} shadow-none ${styles.nw}`} onClick={selectAllImages}>
                    Select all
                  </Button>
                </Nav.Item>

                <Nav.Item className={`mx-2 ${btnClass}`}>
                  <Button variant="danger" className={`${styles['nav-button']} shadow-none ${styles.nw}`} aria-label="Delete selected" onClick={() => dispatch(setShowDeleteModal(true))}>
                    Delete
                  </Button>
                </Nav.Item>

                <Nav.Item className={`mx-2 text-light d-flex justify-content-center align-items-center ${styles.nw} ${btnClass}`}>
                  <span>
                    Selected
                    {' '}
                    {selectedImages.length}
                    {' '}
                    item
                    {s}
                  </span>
                </Nav.Item>

              </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </header>
    ) : null
  );
}

export default Menu;
