import React, { useState, useEffect } from "react";
import {
  BoxColumnWrapper,
  BoxStackingWrapper,
  ButtonsWrapper,
  Divider,
  GridContainer,
  GridItem,
  GridWrapper,
  IntroHeading,
  NumberPlaceholder,
  NumberPlaceholderRow,
  PokerSessionWrapper,
  PrimaryButton,
  StatisticOverviewHolder,
  StatisticsContainer,
  StatisticsWrapper,
  TitleWrapper,
  UserHolder,
  UserInfoHolder,
  UserPointsHolder,
  UsersWrapper,
  Box,
  PercentageText
} from "./styled";
import { firestore } from "../../firebase/firebaseFunctions";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { AiOutlineCheck } from "react-icons/ai";
import { useAuth } from "../../Hooks/useAuth";
import IUser from "../../firebase/firebaseFunctions/interfaces";

export default function PokerSession() {
  const points = [1, 2, 3, 5, 8, 13, 21];
  const [localUsers, setLocalUsers] = useState<IUser[]>([]);
  const { auth } = useAuth();
  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [statistics, setStatistics] = useState<{ [key: number]: number }>({});
  const userDocRef = collection(firestore, "users");


  useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      const onlineUsers: IUser[] = [];
      snapshot.forEach((doc) => {
        const userData = doc.data() as IUser;
        if (userData.isOnline) {
          onlineUsers.push({ ...userData, id: doc.id });
        }
      });
      setLocalUsers(onlineUsers);
    });

    return () => unsubscribe();
  }, []);

  const showVotesHandler = async () => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        showVotes: true,
      }))
    );

    localUsers.forEach(async (user) => {
      if (user.id) {
        const userDocRef = doc(firestore, "users", user.id);
        await updateDoc(userDocRef, {
          ...user,
          showVotes: true,
        });
      }
    });
  };

  const addPointsToUser = async (userId: string, pointsToAdd: number) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [userId]: pointsToAdd,
    }));
    const updatedUsers = localUsers.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          points: user.points,
          hasVoted: true,
        };
      }
      return user;
    });
    setLocalUsers(updatedUsers);

    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, {
      points: pointsToAdd,
      hasVoted: true,
    });
  };

  useEffect(() => {
    const newStatistics: { [key: number]: number } = {};
    localUsers.forEach((user) => {
      if (user.hasVoted) {
        if (user.points in newStatistics) {
          newStatistics[user.points]++;
        } else {
          newStatistics[user.points] = 1;
        }
      }
    });
    setStatistics(newStatistics);
  }, [localUsers]);

  const votedPoints = Object.keys(statistics).map(Number);

  // Total number of votes cast (sum of all votes)
  const totalVotes = Object.values(statistics).reduce(
    (acc, votes) => acc + votes,
    0
  );

  // --- New Variables ---
  const calculatePercentage = (votes: number) => {
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(2) : "0.00";
  };



  // Avoid division by zero
  const percentages: { point: number; percentage: number }[] = totalVotes > 0
    ? points.map((point) => ({
      point,
      percentage: statistics[point]
        ? parseFloat(((statistics[point] / totalVotes) * 100).toFixed(2))
        : 0,
    }))
    : [];

  // Get the highest percentage
  const highestPercentageValue = percentages.length
    ? Math.max(...percentages.map((entry) => entry.percentage))
    : 0;

  // Find all points that have the highest percentage
  const highestPercentagePoints = percentages
    .filter((entry) => entry.percentage === highestPercentageValue)
    .map((entry) => entry.point);

  // Generate the correct display text
  const highestPercentageText =
    highestPercentagePoints.length > 0
      ? `Highest Percentage: ${highestPercentagePoints.join(", ")} (${highestPercentageValue}%)`
      : "No votes yet";
  const clearVotes = async () => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        points: 0,
        hasVoted: false,
        showVotes: false,
      }))
    );

    localUsers.forEach(async (user) => {
      if (user.id) {
        const userDocRef = doc(firestore, "users", user.id);
        await updateDoc(userDocRef, {
          ...user,
          points: 0,
          hasVoted: false,
          showVotes: false,
        });
      }
    });
  };

  const maxCount = Math.max(...Object.values(statistics));


  return (
    <>
      {auth && (
        <PokerSessionWrapper>
          <IntroHeading>
            Embrace the power of GC-Pointing Poker, where every idea counts and
            every contribution shapes the path to success. Let's dive into the
            heart of innovation together!
          </IntroHeading>
          <GridWrapper>
            <GridContainer>
              {points.map((point) => (
                <GridItem
                  activeIndex={localUsers.some(
                    (user) => user.points === point && user.id === auth.userId
                  )}
                  key={point}
                  onClick={() => {
                    addPointsToUser(auth.userId, point);
                  }}
                >
                  {point}
                </GridItem>
              ))}
            </GridContainer>
          </GridWrapper>
          <ButtonsWrapper>
            <PrimaryButton onClick={() => showVotesHandler()}>
              Show votes
            </PrimaryButton>
            <PrimaryButton onClick={() => clearVotes()}>
              Clear votes
            </PrimaryButton>
          </ButtonsWrapper>
          <Divider>
            <UsersWrapper>
              <UserHolder>
                <UserInfoHolder isOpened={true}></UserInfoHolder>
                <UserInfoHolder isOpened={true}>User</UserInfoHolder>
                <UserInfoHolder isOpened={true}>Points</UserInfoHolder>
              </UserHolder>
              {localUsers.map((user) => (
                <UserHolder key={user.id}>
                  <UserInfoHolder isOpened={true}>
                    {user.hasVoted === true && user.isOnline && (
                      <AiOutlineCheck
                        style={{ marginLeft: "50px", color: "green" }}
                        size={22}
                      />
                    )}
                  </UserInfoHolder>
                  <UserInfoHolder isOpened={true}>
                    {user.isOnline ? user.name : null}
                  </UserInfoHolder>
                  <UserPointsHolder isOpened={user.showVotes}>
                    {user.isOnline ? user.points : null}
                  </UserPointsHolder>
                </UserHolder>
              ))}
            </UsersWrapper>
            <StatisticsWrapper isOpen={localUsers.some((user) => user.showVotes === true)}>
              <StatisticsContainer>
                <TitleWrapper>
                  <h2>Statistics</h2>
                  <p>{highestPercentageText}</p> {/* Display highest percentage & points */}
                </TitleWrapper>

                {/* Box Stacking Section */}
                <BoxStackingWrapper maxCount={maxCount}>
                  {points.map((point) => (
                    <BoxColumnWrapper key={point} count={statistics[point]} maxCount={maxCount}>
                      <PercentageText>
                        {statistics[point] > 0
                          ? `${((statistics[point] / totalVotes) * 100).toFixed(0)}%`
                          : ""}
                      </PercentageText>
                      {statistics[point] > 0
                        ? Array(statistics[point])
                          .fill(0)
                          .map((_, i) => <Box key={`${point}-${i}`} />)
                        : null}
                    </BoxColumnWrapper>
                  ))}
                </BoxStackingWrapper>
                <NumberPlaceholderRow>
                  {points.map((point) => (
                    <NumberPlaceholder key={point}>{point}</NumberPlaceholder>
                  ))}
                </NumberPlaceholderRow>
              </StatisticsContainer>
            </StatisticsWrapper>


          </Divider>

        </PokerSessionWrapper>

      )}
    </>
  );
}
