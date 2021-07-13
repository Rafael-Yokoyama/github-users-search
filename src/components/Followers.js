import React from "react";
import { GithubContext } from "../context";
import styled from "styled-components";

const Followers = () => {
  const { followers } = React.useContext(GithubContext);

  return (
    <Wrapper>
      <div className="followers">
        {followers.map((follower, index) => {
          const { avatar_url: img, html_url, login } = follower;
          return (
            <article key={index}>
              <img src={img} alt={login}></img>
              <div>
                <h4>{login}</h4>
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                  {html_url}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  @media screen and (max-width: 492px) {
    max-width: 85%;
  }

  background: var(--clr-white);
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: " followers";
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
    transform: translateY(-100%);
    background: var(--clr-blue-grey);
    color: var(--clr-white);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
  }
  .followers {
    overflow-y: scroll;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
  }
  article {
    @media screen and (max-width: 492px) {
    }
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--radius);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    align-items: center;

    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      margin-bottom: 0;
      color: var(--headings);
    }
    a {
      color: var(--clr-blue-grey);
      &:hover {
        color: var(--clr-primary-2);
      }
    }
  }
`;
export default Followers;
