import React, {useState, useRef, useEffect} from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Footer from './functional/Footer';
import Header from './functional/Header';
import Home from './screens/Home';
import Login from './screens/SignIn';
import RecipeList from './screens/RecipeList';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import RecipeDetails from './screens/RecipeDetails';
import {useSelector, useDispatch} from 'react-redux';
import reduxApiCallers from '../redux/thunks/reduxApiCallers';
import actions from '../redux/actionReducers/index';
import {Dispatch} from '@reduxjs/toolkit';
import {recipes} from '../shared/datasets';
import ScrollToTop from './generic/scrollToTop';
import SignUpComponent from './screens/SignUp';
import SignInComponent from './screens/SignIn';
import MyProfile from './screens/MyProfile';

const {addRecipes} = actions;
const {fetchRecipes} = reduxApiCallers;
const MainRouter = () => {
  const dispatch: Dispatch<any> = useDispatch();
  let location = useLocation();
  dispatch(addRecipes(recipes));

  const HomeRoutes = () => {
    const homePath = [{path: '/home', pathName: 'Home'}];
    const homeRecipeDetailsPath = [{path: '/home', pathName: 'Home'}];
    return (
      <Routes>
        <Route path="/" element={<Home pathDetails={homePath} />} />
        <Route
          path="recipeId/:recipeId"
          element={
            <ScrollToTop>
              <RecipeDetails pathDetails={homeRecipeDetailsPath} />
            </ScrollToTop>
          }
        />
      </Routes>
    );
  };
  const RecipeRoutes = () => {
    const recipePath = [{path: '/home', pathName: 'Home'}];
    const recipeRecipeDetailsPath = [
      {path: '/home', pathName: 'Home'},
      {path: '/recipes', pathName: 'Recipes'},
    ];
    return (
      <Routes>
        <Route path="/" element={<RecipeList pathDetails={recipePath} />} />
        <Route
          path="recipeId/:recipeId"
          element={
            <ScrollToTop>
              <RecipeDetails pathDetails={recipeRecipeDetailsPath} />
            </ScrollToTop>
          }
        />
      </Routes>
    );
  };
  const MyProfileRoutes = () => {
    const myProfilePath = [{path: '/home', pathName: 'Home'}];
    const myProfileRecipeDetailsPath = [
      {path: '/home', pathName: 'Home'},
      {path: '/myProfile', pathName: 'My Profile'},
    ];
    return (
      <Routes>
        <Route path="/" element={<MyProfile pathDetails={myProfilePath} />} />
        <Route
          path="recipeId/:recipeId"
          element={
            <ScrollToTop>
              <RecipeDetails pathDetails={myProfileRecipeDetailsPath} />
            </ScrollToTop>
          }
        />
      </Routes>
    );
  };

  const MainRoutes = () => {
    const navigate = useNavigate();
    const state = useSelector((state: any) => {
      return {
        userState: state.userActionReducer,
      };
    });
    const {userState} = state;
    const {user} = userState;
    const [isModalOpen, updateModalOpen] = useState(false);
    const toggleModal = () => {
      updateModalOpen(!isModalOpen);
    };

    return (
      <div>
        <Header modalCallback={() => toggleModal()} />
        <Routes>
          {/* Home */}
          <Route path="home/*" element={<HomeRoutes />} />

          {/* Recipes */}
          <Route path="recipes/*" element={<RecipeRoutes />} />

          {/* My Stuff */}
          <Route path="myprofile/*" element={<MyProfileRoutes />} />

          {/* Contact Us */}
          <Route path="contactus/*" element={<RecipeRoutes />} />

          {/* default route */}
          <Route path="*" element={<Navigate to="home/" replace />} />
        </Routes>
        <Footer />
        <Modal
          style={{
            paddingTop: 50,
          }}
          isOpen={isModalOpen}>
          <ModalHeader
            className="noselect"
            charCode="Y"
            toggle={() => toggleModal()}>
            Access denied!
          </ModalHeader>
          <ModalBody className="noselect">
            You dont have access to this feature. To <strong>gain</strong>{' '}
            access,
            <strong> create you very own account</strong> with us. If you
            already have an account, go ahead and <strong>sign in</strong> to
            unlock this feature.
          </ModalBody>
          <ModalFooter>
            <Button
              style={{backgroundColor: '#2b59a1'}}
              onClick={() => {
                toggleModal();
                navigate('/auth/signin');
              }}>
              Do it now
            </Button>
            <Button onClick={() => toggleModal()}>Do it later</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  const AuthRoutes = () => {
    return (
      <div>
        <Routes>
          <Route path="signin" element={<SignInComponent />} />
          <Route path="signup" element={<SignUpComponent />} />

          {/* <Route path="*" element={<Navigate to="signup" replace />} /> */}
        </Routes>
      </div>
    );
  };

  return (
    <div>
      <Routes>
        <Route path={'auth/*'} element={<AuthRoutes />} />
        <Route path="/*" element={<MainRoutes />} />
        <Route path="*" element={<Navigate to="/*" replace />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
