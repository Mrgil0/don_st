const { describe } = require("node:test");
const LaundriesService = require("../../../services/laundries.service.js");

let mockLaundriesRepository = {
  createLaundry: jest.fn(),
  createStatus: jest.fn(),
  findLaundry: jest.fn(),
  findLaundries: jest.fn(),
  findLaundryAndStatus: jest.fn(),
};

let laundriesService = new LaundriesService();
laundriesService.LaundriesRepository = mockLaundriesRepository;

describe("Layered Architecture Pattern Laundries Service Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Laundries Service findLaundry Method", async () => {
    const findLaundryReturnValue = [];

    // Repository의 findAllPost Method를 Mocking하고, findAllPostReturnValue를 Return 값으로 변경합니다.
    mockLaundriesRepository.findLaundry = jest.fn(() => {
      return findLaundryReturnValue;
    });

    // PostService의 findAllPost Method를 실행합니다.
    const Laundry = await laundriesService.findLaundry();

    expect(Laundry).toBe(findLaundryReturnValue);

    expect(mockLaundriesRepository.findLaundry).toHaveBeenCalledTimes(1);
  });
});
