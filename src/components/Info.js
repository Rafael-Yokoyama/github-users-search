import React from 'react';
import { GithubContext } from '../context';
import styled from 'styled-components';
import { GoRepo } from 'react-icons/go';
import { BiCodeAlt } from 'react-icons/bi';
import { FiUsers, FiUserPlus } from 'react-icons/fi';

const UserInfo = () => {
  const { githubUser } = React.useContext(GithubContext);
  const { public_repos, followers, following, login } = githubUser;
  console.log(public_repos);
  const items = [
    {
      id: 1,
      icon: <BiCodeAlt className="icon" />,
      name: '',
      value: login,
      color: 'yellow',
    },
    {
      id: 2,
      icon: <GoRepo className="icon" />,
      name: 'repositories',
      value: public_repos,
      color: 'pink',
    },
    {
      id: 3,
      icon: <FiUsers className="icon" />,
      name: 'followers',
      value: followers,
      color: 'green',
    },
    {
      id: 4,
      icon: <FiUserPlus className="icon" />,
      name: 'following',
      value: following,
      color: 'blue',
    },

  ]

  return (
    <section className="section">
      <Wrapper className="section-center">
        {
          items.map((item) => {
            return <Item key={item.id} {...item} />
          })
        }
      </Wrapper>
    </section>
  );
};

const Item = ({ icon, name, color, value }) => {
  return <div className="item">
    <span className={color}>{icon}</span>
    <div>
      <h3>{value}</h3>
      <p>{name}</p>
    </div>
  </div>
}

const Wrapper = styled.section`
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;

  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
      color:var(--headings);
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background:hsl(125, 100%, 79%);
      color:green;
    }
    .blue {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;

export default UserInfo;