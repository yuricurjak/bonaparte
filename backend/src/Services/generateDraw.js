function shuffle(array) {
  let m = array.length, t, i;

  while (m) {

    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

async function generateDraw(array, User) {
  const shuffleArray = shuffle(array);

  for(let i = 0; i < shuffleArray.length; i++) {
    if (i === shuffleArray.length - 1) {
      const update = { friend: shuffleArray[0].name };
      await User.updateOne({ _id: shuffleArray[i] }, update);
    } else {
      const update = { friend: shuffleArray[i+1].name };
      await User.updateOne({ _id: shuffleArray[i] }, update);
    }
  }
}

export default generateDraw;