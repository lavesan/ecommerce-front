export interface IMockService {
  useMock(): boolean;
}

export abstract class BaseMockService implements IMockService {
  useMock(): boolean {
    return process.env.USE_MOCK_DATA === "true";
  }
}
