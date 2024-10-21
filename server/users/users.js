const users = [];

function addUser({ id, name, room }) {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );
  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "username is taken already" };

  const user = { id, name, room };
  users.push(user);
  return { user };
}

function removeUser(id) {
  const index = users.findIndex(function (user) {
    return user.id === id;
  });
  if (index !== -1) return users.splice(index, 1)[0];
}

// function getUser(id) {
//   return users.find(function (user) {
//     return user.id === id;
//   });
// }

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, getUser, removeUser, getUsersInRoom };
