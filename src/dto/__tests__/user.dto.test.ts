import { UserDto, validateUser, assertUser, isUser, createSampleUser } from '../user.dto';

describe('UserDto Validation', () => {
  const validUser: UserDto = createSampleUser();

  describe('validateUser', () => {
    it('should validate a correct user object', () => {
      const result = validateUser(validUser);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validUser);
      }
    });

    it('should fail validation for missing required fields', () => {
      const invalidUser = {
        name: "John Doe",
        email: "john.doe@example.com"
        // missing id, age, isActive, roles, createdAt
      };

      const result = validateUser(invalidUser);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBeDefined();
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should fail validation for incorrect types', () => {
      const invalidUser = {
        ...validUser,
        age: "thirty", // should be number
        isActive: "yes" // should be boolean
      };

      const result = validateUser(invalidUser);
      expect(result.success).toBe(false);
    });

    it('should fail validation for invalid email format', () => {
      const invalidUser = {
        ...validUser,
        email: "invalid-email"
      };

      const result = validateUser(invalidUser);
      expect(result.success).toBe(false);
    });

    it('should validate user with optional profile fields', () => {
      const userWithoutProfile = {
        ...validUser,
        profile: undefined
      };

      const result = validateUser(userWithoutProfile);
      expect(result.success).toBe(true);
    });

    it('should validate user with partial profile', () => {
      const userWithPartialProfile = {
        ...validUser,
        profile: {
          bio: "Just a bio"
          // avatar is optional
        }
      };

      const result = validateUser(userWithPartialProfile);
      expect(result.success).toBe(true);
    });

    it('should fail validation for invalid roles array', () => {
      const invalidUser = {
        ...validUser,
        roles: "admin" // should be array of strings
      };

      const result = validateUser(invalidUser);
      expect(result.success).toBe(false);
    });

    it('should fail validation for invalid date', () => {
      const invalidUser = {
        ...validUser,
        createdAt: "not-a-date"
      };

      const result = validateUser(invalidUser);
      expect(result.success).toBe(false);
    });
  });

  describe('isUser', () => {
    it('should return true for valid user', () => {
      expect(isUser(validUser)).toBe(true);
    });

    it('should return false for invalid user', () => {
      const invalidUser = { name: "John" };
      expect(isUser(invalidUser)).toBe(false);
    });
  });

  describe('assertUser', () => {
    it('should not throw for valid user', () => {
      expect(() => assertUser(validUser)).not.toThrow();
    });

    it('should throw for invalid user', () => {
      const invalidUser = { name: "John" };
      expect(() => assertUser(invalidUser)).toThrow();
    });
  });

  describe('createSampleUser', () => {
    it('should create a valid user object', () => {
      const sampleUser = createSampleUser();
      expect(isUser(sampleUser)).toBe(true);
      
      const result = validateUser(sampleUser);
      expect(result.success).toBe(true);
    });

    it('should create user with expected properties', () => {
      const sampleUser = createSampleUser();
      
      expect(sampleUser.id).toBe(1);
      expect(sampleUser.name).toBe("John Doe");
      expect(sampleUser.email).toBe("john.doe@example.com");
      expect(sampleUser.age).toBe(30);
      expect(sampleUser.isActive).toBe(true);
      expect(sampleUser.roles).toEqual(["user", "admin"]);
      expect(sampleUser.profile).toBeDefined();
      expect(sampleUser.createdAt).toBeInstanceOf(Date);
    });
  });
}); 