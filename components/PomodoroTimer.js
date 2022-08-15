import React from "react";

const PomodoroTimer = ({
  initialTime,
  handleTimerComplete,
  handleTimerUpdate,
}) => {
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    var finalTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    return finalTime;
  };

  return (
    <CountdownCircleTimer
      isPlaying={true}
      duration={
        index < scheduleFormat.length - 1
          ? studyTime
            ? 1500
            : 300
          : scheduleFormat[scheduleFormat.length - 1]
      }
      strokeWidth={50}
      key={studyTime}
      initialRemainingTime={initialTime}
      colors="#ffffff"
      size={300}
      onComplete={() => {}}
      onUpdate={() => {}}
    >
      {({ remainingTime }) => (
        <Text
          style={{
            color: "#ffffff",
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 50,
          }}
        >
          {formatTime(remainingTime)}
        </Text>
      )}
    </CountdownCircleTimer>
  );
};

export default PomodoroTimer;
