import typia from 'typia';

export interface UserDto {
  id: number;
  name: string;
  email: string & typia.tags.Format<"email">;
  age: number;
  isActive: boolean;
  roles: string[];
  profile?: {
    bio: string;
    avatar?: string;
  };
  createdAt: Date;
}

export const validateUser = typia.createValidate<UserDto>();

export const assertUser = typia.createAssert<UserDto>();

export const isUser = typia.createIs<UserDto>();

// Helper function to create a sample user
export const createSampleUser = (): UserDto => ({
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30,
  isActive: true,
  roles: ["user", "admin"],
  profile: {
    bio: "Software developer with 5+ years of experience",
    avatar: "https://example.com/avatar.jpg"
  },
  createdAt: new Date("2023-01-01T00:00:00Z")
}); 