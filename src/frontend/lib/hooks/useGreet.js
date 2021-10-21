import { useMutation, useQuery  } from 'react-query'
import { useHello } from '@/components/Store/Store'
import { ONE_MINUTES_MS } from '@/lib/constants'
import { errorToString, tryCall } from '@/lib/utils'

export const useGreet = () => {
    const hello = useHello()

    return useMutation(
        'greet',
        async ({ name }) => {
            try {
                console.log('hello', hello, name)
                const result = await tryCall(() => hello.greet(name))

                console.log('trycall result', result)

                return result
            } catch (error) {
                if (/assertion failed/.test(error.message)) {
                    // Already executing, refetch
                    return null
                } else {
                    throw error.message
                }
            }

            //   if ("ok" in result) {
            //     return result.ok;
            //   } else {
            //     throw errorToString(result.err);
            //   }
        },
        {
            onSuccess: async (data) => {
                console.log('onSuccess', data)
            }
        }
    )

    // return useQuery(
    //     "greet",
    //     async () => {
    //       const result = await hello.greet("lee.c");
    //       console.log('result', result)
    //       return result;
    //     },
    //     {
    //       placeholderData: [],
    //       refetchInterval: ONE_MINUTES_MS,
    //     }
    //   );
}
