import React, { useState } from 'react';
import styled from 'styled-components';
import { palette, CSS_FONTS, CSS_HELPERS, MEDIA_SCREENS } from '../../theme';

import { Link } from 'react-router-dom';
import { DOTCOM } from '../../constants';

export default function MenuBar(props) {
  const [menus, setMenus] = useState([
    {
      titulo: 'Inicio',
      to: '/',
      icon: 'terminal',
    },
    {
      titulo: 'Tutoriales',
      to: '/tutoriales',
      icon: 'book-open',
    },

    {
      titulo: 'Cursos',
      to: '/cursos',
      icon: 'calendar',
    },

    {
      titulo: 'Resenas',
      to: '/resenas',
      icon: 'star',
    },
  ]);

  // HOOK AVANZADO...
  function activeMenu(menus, menu, index) {
    menus.map(function(item) {
      delete item.active;
      return item;
    });
    menus[index] = { ...menu, active: true };
    setMenus([...menus]);
  }
  let active = menus.findIndex(
    item => item.to === props.history.location.pathname
  );
  active = active === -1 ? 0 : active;
  menus[active].active = 'active';

  return (
    <Container>
      <TabsBar hideTabs={props.hideTabs} showTabs={props.showTabs}>
        <ul>
          {menus.map((menu, index) => (
            <li key={index}>
              <Link
                to={menu.to}
                className={menu.active && 'active'}
                onClick={() => activeMenu(menus, menu, index)}
              >
                <span className="lnr lnr-mustache"></span>
                {/* <FeatherIcon icon={menu.icon} size={24} /> */}
                <TextSm>{menu.titulo}</TextSm>
              </Link>
            </li>
          ))}
        </ul>
      </TabsBar>

      <Navbar>
        <LogoContainer>
          <img src={DOTCOM} alt="logo" />
        </LogoContainer>

        <MenuList>
          <ul>
            {menus.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.to}
                  className={menu.active && 'active'}
                  onClick={() => activeMenu(menus, menu, index)}
                >
                  {/* <FeatherIcon icon={menu.icon} size={27} /> */}
                  <span className="lnr lnr-mustache"></span>

                  <Text>{menu.titulo}</Text>
                </Link>
              </li>
            ))}
          </ul>
        </MenuList>
        {/* <OnboardActionsContainer>
                    {props.children}
                </OnboardActionsContainer> */}
      </Navbar>
    </Container>
  );
}

const { primary, secondary, dark } = palette;
const defaultBottom = `border-bottom: 3px solid ${primary.contrastText} !important;`;
const primaryBottom = `border-bottom: 3px solid ${primary.main} !important;`;

const Container = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  margin-bottom: 0.6em;
  z-index: 10;
`;

const Text = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
`;
const TextSm = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
`;

const Navbar = styled.div`
  margin: 0 9px 0 9px;
  display: flex;
  flex-direction: row;
  background-color: ${secondary.contrastText};
  ${CSS_HELPERS.BOX_SHADOW}
  ${CSS_HELPERS.ROUNDED}
`;

const LogoContainer = styled.div`
    /* ${defaultBottom} */
    ${CSS_HELPERS.CENTER}
    flex:2;
    > img {
         margin: 1.5vh 0 1.5vh 1.5vw;
            width: 12em;   
            @media only screen and (max-width: ${MEDIA_SCREENS.SMALL.TO}px) and (min-width: ${MEDIA_SCREENS.SMALL.FROM}px) {
            margin: 1.8vh 0 1.5vh 0;
            width: 200px;   
        }
    }

    
`;

const MenuList = styled.div`
   @media only screen and (max-width: ${MEDIA_SCREENS.SMALL.TO}px) and (min-width: ${MEDIA_SCREENS.SMALL.FROM}px)  {
        display:none
   }
   & * {
       text-decoration: none !important;
       list-style-type: none !important;
    }
   flex:6; 
   > ul {
        font-family:${CSS_FONTS.FONTS.MENU};
        font-size:${CSS_FONTS.SIZES.MENU};
        display:flex;
        flex-direction:row;
        justify-content: space-around;
        padding:0;
        margin:0;
        >li { flex-grow: 1; }
        > li  a{
            /* ${defaultBottom} */
            color:${dark.metalblue};
            display:flex;
            flex-direction:row;
            ${CSS_HELPERS.CENTER}
            padding:1em;
            &:hover{
                /* ${primaryBottom} */
                // background-color:${primary.main};
            }
            &.active{
                /* ${primaryBottom} */
            }
        }
    }
`;

const animationDown = `
-webkit-animation: mover 1s forwards;
animation: mover 1s forwards;  
@-webkit-keyframes mover {
0% { transform: translateY(0); }
100% { transform: translateY(10vh); }
}
@keyframes mover {
0% { transform: translateY(0); }
100% { transform: translateY(10vh); }
}   
`;

const TabsBar = styled.div`
  ${props => props.hideTabs && animationDown}
  z-index: 1;
  @media only screen and (max-width: ${MEDIA_SCREENS.MEDIUM
      .TO}px) and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM}px) {
    display: none;
  }

  font-family: ${CSS_FONTS.FONTS.MENU};
  font-size: ${CSS_FONTS.SIZES.MENU};
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  & * {
    text-decoration: none;
    list-style-type: none;
  }
  > ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    > li {
      flex-grow: 1;
      // margin-left:.9em;
      // margin-right:.9em;
    }
    > li a {
      background-color: ${primary.contrastText};
      color: ${primary.main};
      display: flex;
      flex-direction: column;
      ${CSS_HELPERS.CENTER};
      padding: 0.6em 0 0.6em 0;
      border-top: 3px solid ${primary.contrastText} !important;
      :nth-child(1) {
        font-size: 0.6em;
        font-weight: 600;
      }

      &:hover {
        border-top: 3px solid ${primary.main} !important;
        background-color: ${primary.main};
        color: ${primary.contrastText};
      }
      &.active {
        border-top: 3px solid ${primary.main} !important;
      }
    }
  }
`;
