import React, {useState} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import {cssHover} from './hoverProps';
import {RecipeCardProps, CheckboxProps} from '../../config/types';
import {icons} from '../../config/configuration';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import actions from '../../redux/actionReducers/index';
import apis from '../../config/api';
import {gifs} from '../../config/configuration';

const {addRecipeToFavorites, deleteRecipeFromFavorites, addRecipeToRecents} =
  actions;

const Generic = {
  RecipeCard: (cardProps: RecipeCardProps) => {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();

    const state = useSelector((state: any) => {
      return {
        userState: state.userActionReducer,
      };
    });
    const {userState} = state;
    const {user} = userState;

    const [isMouseHoveredOnBookmarkButton, changeMouseStatus] = useState(false);
    const {data, index, redirect} = cardProps;
    const {
      _id,
      title,
      imageUrl,
      cuisine,
      totalTimeInMins,
      diet,
      servings,
      course,
      isFavorite,
    } = data;
    const cardHoverStlye = cssHover(
      {
        transform: 'scale(1.05)',
        zIndex: 10,
        transition: '0.5s',
      },
      {transition: '0.3s'},
      {height: '100%'},
    );
    var bookmarkIcon = () => {
      if (isMouseHoveredOnBookmarkButton) {
        return icons.bookmark_hover;
      } else if (isFavorite) {
        return icons.bookmark_selected;
      }
      return icons.bookmark_unselected;
    };
    return (
      <Link
        to={redirect}
        state={{recipeId: data._id}}
        style={{textDecoration: 'none', color: 'black', height: '100%'}}>
        <div
          {...cardHoverStlye}
          className="pb-3"
          onClick={() => {
            user &&
              apis
                .postToCategory({
                  property: 'recents',
                  category: 'recipes',
                  id: data._id,
                })
                .then(({data}) => {
                  dispatch(addRecipeToRecents(data._id));
                })
                .catch(err => {
                  alert(
                    'Oops! Something went wrong. Could not add this recipe to recents',
                  );
                });
          }}>
          <Card
            className="noselect  col-12 col-sm-12 mb-3"
            style={{height: '100%'}}>
            <CardBody className="noselect p-0">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <div
                className="noselect w-100 img-fluid center"
                style={{
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                  height: 320,
                  objectFit: 'cover',
                  backgroundImage: `url(${imageUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: user ? 'space-between' : 'flex-end',
                  alignItems: 'flex-end',
                }}>
                {user && (
                  <div
                    className="noselect  "
                    style={{
                      marginTop: -13,
                      padding: 5,
                    }}>
                    <img
                      onMouseEnter={() => changeMouseStatus(true)}
                      onMouseLeave={() => changeMouseStatus(false)}
                      onMouseDown={() => changeMouseStatus(false)}
                      className="noselect col-auto "
                      src={bookmarkIcon()}
                      height={45}
                      width={45}
                      alt="Recipe Diary"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        isFavorite
                          ? apis
                              .deleteFromCategory({
                                property: 'favorites',
                                category: 'recipes',
                                id: _id,
                              })
                              .then(({data}) => {
                                dispatch(deleteRecipeFromFavorites(_id));
                              })
                              .catch(err => {
                                if (
                                  err &&
                                  err.message &&
                                  err.message === 'Network Error'
                                ) {
                                  if (navigator.onLine) {
                                    navigate('/server-down', {
                                      state: {redirectPath: '/'},
                                    });
                                  } else {
                                    alert(
                                      'This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again',
                                    );
                                  }
                                } else {
                                  alert('Oops! Something went wrong');
                                }
                              })
                          : apis
                              .postToCategory({
                                property: 'favorites',
                                category: 'recipes',
                                id: data._id,
                              })
                              .then(({data}) => {
                                dispatch(addRecipeToFavorites(_id));
                              })
                              .catch(err => {
                                if (
                                  err &&
                                  err.message &&
                                  err.message === 'Network Error'
                                ) {
                                  if (navigator.onLine) {
                                    navigate('/server-down', {
                                      state: {redirectPath: '/'},
                                    });
                                  } else {
                                    alert(
                                      'This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again',
                                    );
                                  }
                                } else {
                                  alert('Oops! Something went wrong');
                                }
                              });
                      }}
                    />
                  </div>
                )}
                <div
                  className="noselect px-2 mb-1 me-1 py-1"
                  style={{backgroundColor: 'antiquewhite', borderRadius: 50}}>
                  {totalTimeInMins} min
                </div>
              </div>
              <div className="noselect p-4 pb-2">
                <CardTitle tag="h5" style={{color: 'black'}}>
                  {title}
                </CardTitle>
                <CardSubtitle className="noselect mb-2 text-muted" tag="h6">
                  {`${cuisine} | ${course} | ${servings} servings`}
                </CardSubtitle>
              </div>
            </CardBody>
          </Card>
        </div>
      </Link>
    );
  },
  InfoCard: ({cardProps}: {cardProps: any}) => {
    const {title, description, link, image, color} = cardProps;
    return (
      <>
        <Card
          className="noselect  col-12  mb-3  border-0 "
          style={{
            height: '100%',
            backgroundColor: color,
            boxShadow: `0px 0px 10px 3px #ccc`,
          }}>
          <CardBody className="noselect p-0  m-0 d-flex flex-column justify-content-end align-items-center">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}

            <div className="noselect p-0 px-4 ">
              <CardTitle
                className="mt-5"
                style={{
                  color: '#333',
                  fontSize: '30px',
                  lineHeight: '34px',
                  fontWeight: 'bolder',
                  textAlign: 'center',
                  marginBottom: 20,
                }}>
                {title}
              </CardTitle>
              <CardSubtitle
                className="noselect mb-2 px-2 "
                style={{
                  color: '#333',
                  fontSize: '16px',
                  lineHeight: '18px',
                  fontWeight: 'lighter',
                  textAlign: 'center',
                }}>
                {description}
              </CardSubtitle>
            </div>
            <img src={image} className="img-fluid m-0 " alt="a" />
          </CardBody>
        </Card>
      </>
    );
  },
  Checkbox: (checkboxProps: CheckboxProps) => {
    const {label, value, onChange} = checkboxProps;
    return (
      <div className="noselect d-flex justify-content-start align-items-start text-wrap col-12">
        <input 
          type="checkbox"
          checked={value}
          onChange={onChange}
          style={{
            marginTop: 5,
            cursor: 'pointer',
          }}
          className="col-2"
        />
        <span
          onClick={onChange}
          className="text-wrap "
          style={{cursor: 'pointer'}}>{`  ${label}`}</span>
      </div>
    );
  },
  Spinner: ({text}: {text: string}) => {
    return (
      <div className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{height: 600}}>
          <img src={gifs.loadingGif} style={{width: 80, height: 80}} alt="" />
          <p className="text-center">Loading {text}</p>
        </div>
      </div>
    );
  },
  ListError: ({error}: any) => {
    return (
      <div
        className="container"
        style={{height: 600, justifyContent: 'center', alignItems: 'center'}}>
        <Row className="justify-content-center">
          <p className="text-center">Error {error}</p>
        </Row>
      </div>
    );
  },
};

export default Generic;
