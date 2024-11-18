public class EmailTest {
    
        [Fact(DisplayName = "Should create valid email")]
        public void ShouldCreateValidEmail()
        {
            string email = "test@example.com";
            Email emailObj = new Email(email);
            Assert.Equal(email, emailObj.value);
        }

        [Fact(DisplayName = "should give 'Invalid email' error if the email is invalid")]
        public void ShouldGiveAnErrorIfTheEmailIsInvalid()
        {
            string email = "invalid-email";
            var exception = Assert.Throws<ArgumentException>(() => new Email(email));
            Assert.Equal("Invalid email", exception.Message);
        }
}