/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { getStoryIds } from '../services/hnApi';
import Story from '../components/Story';
import { GlobalStyle, StoriesContainerWrapper } from '../styles/StoriesCont-Styles';
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const storiesContainer = () => {
    const { count } = useInfiniteScroll();
    const [storyIds, setStoryIds] = useState([]);

    useEffect(() => {
        getStoryIds().then(result => setStoryIds(result));
    }, []);

    return (
        <>
            <GlobalStyle />
            <StoriesContainerWrapper data-testid="stories-container">
                <h1>Hacker News Stories</h1>
                {storyIds.slice(0, count).map(storyId => (
                    <Story key={storyId} storyId={storyId} />
                ))}
            </StoriesContainerWrapper>
        </>
    );
};

export default storiesContainer;
