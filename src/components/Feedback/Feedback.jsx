import { useState, useMemo } from 'react';

import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const Feedback = () => {
  const [feedback, setFeedback] = useState(initialState);
  const addAttribute = property => {
    setFeedback(state => {
      const newFeedback = state[property];
      return {
        ...feedback,
        [property]: newFeedback + 1,
      };
    });
  };

  const countTotalFeedback = useMemo(() => {
    const total = Object.values(feedback).reduce(
      (total, value) => (value ? total + value : total),
      0
    );

    return total;
  }, [feedback]);

  const countPositiveFeedbackPercentage = useMemo(() => {
    if (countTotalFeedback) {
      const percentage = Number.parseFloat(
        ((feedback.good / countTotalFeedback) * 100).toFixed(1)
      );
      return percentage;
    }
    return 0;
  }, [countTotalFeedback, feedback.good]);

  return (
    <>
      <FeedbackOptions options={feedback} onLeaveFeedback={addAttribute} />

      {countTotalFeedback ? (
        <Statistics
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={countTotalFeedback}
          positivePercentage={countPositiveFeedbackPercentage}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
};

export default Feedback;
