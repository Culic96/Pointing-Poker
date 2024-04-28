import React, { useState, useEffect } from "react";
import {
  Divider,
  GridContainer,
  GridItem,
  GridWrapper,
  PokerSessionWrapper,
  UserHolder,
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
  useEffect(() => {
    console.log("localUserChanged", localUsers);
  }, [localUsers]);

  const addPointsToUser = (userId: string, pointsToAdd: number) => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, points: user.points + pointsToAdd }; // Increment points
        }
        return user;
      })
    );
  };

  return (
    <>
      {auth && (
        <PokerSessionWrapper>
          <h2 style={{ color: "orange" }}>
            Welcome to GC point poker where ideas are turned into code
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
          <UsersWrapper>
            {localUsers.map((user) => (
              <UserHolder key={user.id}>
                <AiOutlineCheck size={24} />
                {user.name} - {user.points}
              </UserHolder>
            ))}
          </UsersWrapper>
          <button onClick={logoutUser}>Logout</button>
        </PokerSessionWrapper>
      )}
    </>
  );
}
