import React, { useMemo } from 'react'
import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { DataTableCard2, DateTime } from 'asab_webui_components'
import axios from 'axios'
import { Link } from 'react-router-dom'

const loader = async ({ params }) => {
    let response = await axios.get('https://devtest.teskalabs.com/data', { params })
    const rows = response.data.data
    const count = response.data.count
    return { count, rows }
}

export function TableScreen(props) {
    const { t } = useTranslation()

    const columns = useMemo(
        () => [
            {
                title: t('General|Username'),
                thStyle: { minWidth: '2rem' },
                render: ({ row }) => (
                        <Link title={row.id} to={`/detail/${row.id}`}>
                            {row.username}
                        </Link>
                ),
            },
            {
                title: t('General|Email'),
                thStyle: { minWidth: '2rem' },
                render: ({ row }) => row.email,
            },
            {
                title: t('General|Address'),
                thStyle: { minWidth: '4rem' },
                render: ({ row }) => row.address,
            },
            {
                title: t('General|Created at'),
                thStyle: { minWidth: '4rem' },
                render: ({ row }) => <DateTime value={row.created} />,
            },
            {
                title: t('General|Last sign in'),
                thStyle: { minWidth: '4rem' },
                render: ({ row }) => <DateTime value={row.last_sign_in} />,
            },
        ],
        [t]
    )

    return (
        <Container className='h-100'>
            <DataTableCard2 columns={columns} loader={loader} header={<Header />} disableParams={true} />
        </Container>
    )
}

const Header = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className='flex-row align-items-center'>
                <i class='bi bi-people me-2'></i>
                <h4>{t('General|Users')}</h4>
            </div>
        </>
    )
}
