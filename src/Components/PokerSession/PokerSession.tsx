import React, { useState, useEffect } from "react";
import {
  ButtonsWrapper,
  Divider,
  GridContainer,
  GridItem,
  GridWrapper,
  PokerSessionWrapper,
  PrimaryButton,
  UserHolder,
  UserInfoHolder,
  UserPointsHolder,
  UsersWrapper,
} from "./styled";
import { firestore } from "../../firebase/firebaseFunctions";
import { collection, getDocs } from "firebase/firestore";
import { AiOutlineCheck } from "react-icons/ai";
import IUser from "../../firebase/firebaseFunctions/interfaces";
import { useAuth } from "../../Hooks/useAuth";

export default function PokerSession() {
  const points = [1, 2, 3, 5, 8, 13, 21];
  const [localUsers, setLocalUsers] = useState<IUser[]>([]);
  const { auth, logoutUser } = useAuth();
  const [showVotes, setShowVotes] = useState(false)
  useEffect(() => {
    const getUsersAsync = async () => {
      try {
        const usersData: IUser[] = [];
        const querySnapshot = await getDocs(collection(firestore, "users"));
        querySnapshot.forEach((doc) => {
          console.log("Document data:", doc.data());
          usersData.push(doc.data() as IUser);
        });
        setLocalUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };

    getUsersAsync();
  }, []); // Fetch users on component mount

  const showVotesHandler = () => {
    setShowVotes(true);
  }

  const addPointsToUser = (userId: string, pointsToAdd: number) => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, points: user.points = pointsToAdd, hasVoted: user.hasVoted = true }; // Increment points
        }
        return user;
      })
    );
  };

  const clearVotes = () => {
    setLocalUsers((prevUsers) => 
    prevUsers.map((user) => {
      console.log("called")
      setShowVotes(false);
      return {...user, point: user.points = 0, hasVoted: user.hasVoted = false}
    }))
  }

  return (
    <>
      {auth && (
        <PokerSessionWrapper>
          <h2 style={{ color: "orange", padding: '20px' }}>
          Embrace the power of GC-Pointing Poker, where every idea counts and every contribution shapes the path to success. Let's dive into the heart of innovation together!
          </h2>
          <GridWrapper>
            <GridContainer>
              {points.map((point) => (
                <GridItem
                  key={point}
                  onClick={() => addPointsToUser(auth.userId, point)}
                >
                  {point}
                </GridItem>
              ))}
            </GridContainer>
          </GridWrapper>
          <ButtonsWrapper>
            <PrimaryButton onClick={() => showVotesHandler()}>Show votes</PrimaryButton>
            <PrimaryButton onClick={() => clearVotes()}>Clear votes</PrimaryButton>

          </ButtonsWrapper>
          <Divider>
          <UsersWrapper>
            <UserHolder>
            <UserInfoHolder isOpened={true}></UserInfoHolder><UserInfoHolder isOpened={true}>User</UserInfoHolder><UserInfoHolder isOpened={true}>Points</UserInfoHolder>
            </UserHolder>
            {localUsers.map((user) => (
             <UserHolder key={user.id}>
             <UserInfoHolder isOpened={true}>
               {user.hasVoted === true && user.isOnline && <AiOutlineCheck size={24} />}
             </UserInfoHolder>
             <UserInfoHolder isOpened={true}>
             {user.isOnline ? user.name : null}
             </UserInfoHolder>
             <UserPointsHolder isOpened={showVotes}>
             {user.isOnline ? user.points : null}
             </UserPointsHolder>
           </UserHolder>
            ))}
          </UsersWrapper>
          </Divider>
          <PrimaryButton onClick={logoutUser}>Logout</PrimaryButton>
        </PokerSessionWrapper>
      )}
    </>
  );
}
