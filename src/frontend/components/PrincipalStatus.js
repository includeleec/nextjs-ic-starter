import { shortPrincipal } from 'utils/principal'

export const PrincipalStatus = ({ principalId }) => {
    return (
        <div className={`principal-badge ${!principalId.length && 'not-connected'}`}>
            {principalId.length ? shortPrincipal(principalId) : 'Not Connected'}
        </div>
    )
}
