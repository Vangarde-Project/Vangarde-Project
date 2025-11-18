import bcrypt from "bcryptjs";

const password = "Test1234!";

bcrypt.hash(password, 10).then(hash => {
  console.log(hash);
  process.exit(0);
});

//$2b$10$ENzAy.mM2Pp9bX2O1mzxK.vBZB0hXG0G5FOu/4/IW0J3ZV0Lksanm