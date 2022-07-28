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
import {Link} from 'react-router-dom';
import {cssHover} from './hoverProps';
import {RecipeCardProps, CheckboxProps} from '../../config/types';
import {icons} from '../../config/configuration';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import actions from '../../redux/actionReducers/index';
import loadingGif from '../../assets/gifs/loader.gif';

const {addRecipeToFavorites, deleteRecipeFromFavorites, addRecipeToRecents} =
  actions;

const Generic = {
  RecipeCard: (cardProps: RecipeCardProps) => {
    const dispatch: Dispatch<any> = useDispatch();
    const state = useSelector((state: any) => {
      return {
        userState: state.userActionReducer,
      };
    });
    const {userState} = state;

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
        style={{textDecoration: 'none', color: 'black'}}>
        <div
          {...cardHoverStlye}
          onClick={() => {
            dispatch(addRecipeToRecents(data._id));
          }}>
          <Card className="noselect  col-12 col-sm-12 ">
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
                  justifyContent:
                    userState && userState.user ? 'space-between' : 'flex-end',
                  alignItems: 'flex-end',
                }}>
                {userState && userState.user && (
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
                          ? dispatch(deleteRecipeFromFavorites(_id))
                          : dispatch(addRecipeToFavorites(_id));
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
          <img
            src={loadingGif}
            style={{width: 100, height: 80}}
            alt="loading..."
          />
          <p className="text-center mt-3">Loading {text}</p>
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
