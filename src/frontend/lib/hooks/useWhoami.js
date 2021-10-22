import { useMutation  } from 'react-query'
import { useWhoami } from '@/components/Store/Store'
import { tryCall } from '@/lib/utils'

export const useWhoareyou = () => {
    const whoami = useWhoami()

    return useMutation(
        'whoami',
        async ({ name }) => {
            try {
                console.log('whoami', whoami, name)
                const result = await tryCall(() => whoami.whoareyou(name))

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
