import { useState, useEffect } from 'react';
import { STORY_INCREMENT, MAX_STORIES } from '../constants/constants';
import { debounce } from '../utils/debounce';

const useInfiniteScroll = () => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(STORY_INCREMENT);

    const handleScroll = debounce(() => {
        if (
        window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight ||
        loading
        ) {
        return false;
        }

        setLoading(true);
    });

    useEffect(() => {
        if (!loading) return;

        if (count + STORY_INCREMENT >= MAX_STORIES) {
            setCount(MAX_STORIES);
        } else {
            setCount(count + STORY_INCREMENT)
        }

        setLoading(false);
    }, [count, loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line
    }, [])

    return {count};
};

export default useInfiniteScroll;
