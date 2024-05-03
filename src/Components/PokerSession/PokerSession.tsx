import React, { useState, useEffect } from "react";
import {
  ButtonsWrapper,
  Divider,
  GridContainer,
  GridItem,
  GridWrapper,
  IntroHeading,
  PokerSessionWrapper,
  PrimaryButton,
  UserHolder,
  UserInfoHolder,
  UserPointsHolder,
  UsersWrapper,
} from "./styled";
import { firestore } from "../../firebase/firebaseFunctions";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { AiOutlineCheck } from "react-icons/ai";
import { useAuth } from "../../Hooks/useAuth";
import IUser from "../../firebase/firebaseFunctions/interfaces";

export default function PokerSession() {
  const points = [1, 2, 3, 5, 8, 13, 21];
  const [localUsers, setLocalUsers] = useState<IUser[]>([]);
  const { auth } = useAuth();
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
  
    // Update all user documents in Firestore
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
    const updatedUsers = localUsers.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          points: user.points + pointsToAdd,
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
               activeIndex={localUsers.some((user) => user.points === point)}
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
                      <AiOutlineCheck style={{marginLeft: '50px', color: 'green'}} size={22} />
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
          </Divider>
          
        </PokerSessionWrapper>
      )}
    </>
  );
}
