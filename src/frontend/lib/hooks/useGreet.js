import { useMutation  } from 'react-query'
import { useHello } from '@/components/Store/Store'
import { tryCall } from '@/lib/utils'

export const useGreet = () => {
    const hello = useHello()

    return useMutation(
        'greet',
        async ({ name }) => {
            try {
                console.log('hello', hello, name)
                const result = await tryCall(() => hello.greet(name))
                // const result = await hello.greet(name)

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
}
