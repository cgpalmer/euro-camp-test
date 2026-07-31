import axios from 'axios';
import { getAllParcs } from './api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getParcs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns all parcs data when the request succeeds', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { 
        id: '1234',
        name: 'big parc',
        description: 'Lovely big parc',}
    });

    const result = await getAllParcs();

    expect(result).toEqual({ id: '1234', name: 'big parc', description: 'Lovely big parc'});
  })


  it('handles a 502 gateway error', async () => {
  mockedAxios.get.mockRejectedValueOnce({
    isAxiosError: true,
    message: 'Request failed with status code 502',
    response: {
      status: 502,
      data: 'Bad Gateway',
    },
  });

  const result = await getAllParcs();
  
  expect(result).toBeUndefined();
});
  
});