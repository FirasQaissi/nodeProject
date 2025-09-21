// Utils/handleErrors.js

// פונקציה לטיפול בשגיאות כלליות מ-validator
//const handleBadRequest = async (error) => {
  // קביעת הודעת השגיאה
  //const errorMessage = error.message || "Bad request error";

  // יצירת אובייקט שגיאה חדש
  //const newError = {
  //  message: errorMessage,
   // status: error.status || 400,
  //};

  // החזרת ה-Promise עם השגיאה
 // return Promise.reject(newError);
//};

// פונקציה לטיפול בשגיאות Joi
//const handleJoiError = async (joiError) => {
  // קביעת הודעת שגיאה מתוך אובייקט ה-Joi
 // const errorMessage = joiError.details[0].message;

  // בניית אובייקט שגיאה חדש
  //const error = {
   // message: errorMessage,
   // status: 400,
  //};

  // הפעלה של handleBadRequest כדי להחזיר את ה-Promise
 // return handleBadRequest(error);
//};

// ייצוא הפונקציות לשימוש בפרויקט
//exports.handleBadRequest = handleBadRequest;
//exports.handleJoiError = handleJoiError;
