// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { getStory } from '../services/hnApi';
import {
    StoryContainer,
    StoryTitle,
    StoryMeta,
    StoryMetaElement,
} from '../styles/StoryStyles';
import { mapTime } from '../mappers/mapTime';

const Story = ({ storyId }) => {
    const [story, setStory] = useState({});
    useEffect(() => {
        getStory(storyId).then(data => data && setStory(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return story && story.url ? (
        <StoryContainer data-testid='story'>
        <StoryTitle>
            <a href={story.url}>{story.title}</a>
        </StoryTitle>

        <StoryMeta>
            <span className='story_by' data-testid='story-by'>
            <StoryMetaElement color='#000'>By: </StoryMetaElement>
            {story.by}
            </span>
            <br />
            <span className='story_time' data-testid='story-time'>
            <StoryMetaElement color='#000'>Posted:</StoryMetaElement> {mapTime(story.time)} ago
            </span>
        </StoryMeta>
        </StoryContainer>
    ) : null;
};

export default Story;
