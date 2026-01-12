export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {
    if (!name) throw new Error('Name is required');
    if (!email) throw new Error('Email is required');
  }
}
