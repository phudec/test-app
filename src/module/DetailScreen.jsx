import React, { useCallback, useEffect, useState } from 'react'
import { Container, CardHeader, CardBody } from 'reactstrap'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { DateTime } from 'asab_webui_components'

export const DetailScreen = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const [apiData, setApiData] = useState()

    const fetchApi = useCallback(async (id) => {
        await axios.get(`https://devtest.teskalabs.com/detail/${id}`).then((res) => {
            setApiData(res.data)
        })
    }, [])

    useEffect(() => {
        id && fetchApi(id)
    }, [fetchApi, id])

    return (
        <Container className='h-100'>
            <div className='card'>
                <Card header={<Header />}>
                    {apiData ? (
                        <>
                            <Card header={<h4>{t('General|General info')}</h4>}>
                                <Text title={t('General|Username')} text={apiData.username} />
                                <Text title={t('General|ID')} text={apiData.id} />
                                <Text title={t('General|Email')} text={apiData.email} />
                                <Text title={t('General|Phone number')} text={apiData.phone_number} />
                                <Text title={t('General|Address')} text={apiData.address} />
                            </Card>
                            <Card header={<h4>{t('General|Others')}</h4>}>
                                <Text title={t('General|Created at')} text={<DateTime value={apiData.created} />} />
                                <Text title={t('General|Last sign in')} text={<DateTime value={apiData.last_sign_in} />} />
                                <Text title={t('General|IP address')} text={apiData.ip_address} />
                                <Text title={t('General|MAC address')} text={apiData.mac_address} />
                            </Card>
                        </>
                    ) : null}
                </Card>
            </div>
        </Container>
    )
}

const Header = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <div className='flex-row align-items-center'>
            <button
                type='button'
                className='btn btn-outline-secondary me-2 rounded-circle'
                onClick={() => {
                    navigate('/')
                }}
            >
                <i className='bi bi-chevron-left' />
            </button>
            <i className='bi bi-person me-2'></i>
            <h4>{t('General|User detail')}</h4>
        </div>
    )
}

const Card = (props) => {
    return (
        <>
            <CardHeader className='card-header-flex'>{props.header}</CardHeader>
            <CardBody>{props.children}</CardBody>
        </>
    )
}

const Text = (props) => {
    return (
        <div className='d-flex justify-content-between'>
            <span style={{ fontWeight: 600 }} className='pe-2'>{`${props.title}:`}</span>
            {props.text}
        </div>
    )
}
